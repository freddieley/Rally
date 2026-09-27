import React, { useRef, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CameraView,
  CameraType,
  FlashMode,
  useCameraPermissions,
} from 'expo-camera';
import { router } from 'expo-router';

import {
  CameraControls,
  CameraMode,
  CameraTopBar,
} from '../components/camera';

import { colors } from '../components/ui/tokens';

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] =
    useCameraPermissions();

  const [facing, setFacing] =
    useState<CameraType>('back');

  const [flash, setFlash] =
    useState<FlashMode>('off');

  const [mode, setMode] =
    useState<CameraMode>('photo');

  const [ready, setReady] =
    useState(false);

  const [recording, setRecording] =
    useState(false);

  if (!permission) {
    return (
      <View style={styles.container} />
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permission}>
        <Text style={styles.permissionTitle}>
          Camera access
        </Text>

        <Text style={styles.permissionText}>
          Rqlly needs camera access to capture
          photos and videos.
        </Text>

        <Text
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          Allow camera
        </Text>
      </View>
    );
  }

  function flipCamera() {
    if (recording) return;

    setFacing(current =>
      current === 'back'
        ? 'front'
        : 'back',
    );
  }

  function cycleFlash() {
    setFlash(current => {
      if (current === 'off') return 'auto';
      if (current === 'auto') return 'on';
      if (current === 'on') return 'off';

      return 'off';
    });
  }

  function changeMode(nextMode: CameraMode) {
    if (recording) return;

    setMode(nextMode);
  }

  async function capture() {
    if (!cameraRef.current || !ready) {
      return;
    }

    if (mode === 'photo') {
      try {
        const photo =
          await cameraRef.current.takePictureAsync();

        if (!photo?.uri) {
          return;
        }

        console.log(
          'Captured photo:',
          photo.uri,
        );

        Alert.alert(
          'Photo captured',
          photo.uri,
        );
      } catch (error) {
        console.error(
          'Photo capture failed:',
          error,
        );
      }

      return;
    }

    if (!recording) {
      try {
        setRecording(true);

        const video =
          await cameraRef.current.recordAsync({
            maxDuration: 60,
          });

        if (video?.uri) {
          console.log(
            'Captured video:',
            video.uri,
          );

          Alert.alert(
            'Video captured',
            video.uri,
          );
        }
      } catch (error) {
        console.error(
          'Video recording failed:',
          error,
        );
      } finally {
        setRecording(false);
      }
    } else {
      cameraRef.current.stopRecording();
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={facing}
        flash={flash}
        mode={mode === 'video' ? 'video' : 'picture'}
        animateShutter
        onCameraReady={() => setReady(true)}
      />

      <View style={styles.overlay}>
        <View style={styles.topArea}>
          <CameraTopBar
            flash={flash}
            onClose={() =>
              router.canGoBack()
                ? router.back()
                : router.replace('/discover')
            }
            onFlashPress={cycleFlash}
          />
        </View>

        <View style={styles.bottomArea}>
          <CameraControls
            mode={mode}
            recording={recording}
            ready={ready}
            onModeChange={changeMode}
            onCapture={capture}
            onFlip={flipCamera}
            onGallery={() => {
              Alert.alert(
                'Gallery',
                'Gallery integration comes next.',
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },

  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },

  topArea: {
    paddingTop: 58,
  },

  bottomArea: {
    paddingBottom: 34,
  },

  permission: {
    flex: 1,
    backgroundColor: colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  permissionTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },

  permissionText: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 28,
  },

  permissionButton: {
    color: colors.brand,
    fontSize: 16,
    fontWeight: '700',
  },
});