import React,{useEffect,useRef}from'react';
import{Animated,Easing,StyleSheet,View}from'react-native';
import{router}from'expo-router';
import{SafeAreaView}from'react-native-safe-area-context';
import{RqllyText,colors,spacing}from'../components/ui';
import{AuthBackground}from'../components/auth/AuthBackground';
import{useAuth}from'../lib/auth';

export default function LoadingScreen(){
 const{session,loading:authLoading}=useAuth();
 const rotation=useRef(new Animated.Value(0)).current;
 const scale=useRef(new Animated.Value(.8)).current;
 const opacity=useRef(new Animated.Value(0)).current;
 useEffect(()=>{Animated.parallel([Animated.spring(scale,{toValue:1,damping:12,stiffness:180,useNativeDriver:true}),Animated.timing(opacity,{toValue:1,duration:350,easing:Easing.out(Easing.cubic),useNativeDriver:true})]).start();const loop=Animated.loop(Animated.timing(rotation,{toValue:1,duration:900,easing:Easing.linear,useNativeDriver:true}));loop.start();return()=>loop.stop()},[opacity,rotation,scale]);
 useEffect(()=>{if(!authLoading){router.replace(session?'/(app)/discover':'/auth/sign-in')}},[authLoading,session]);
 const rotate=rotation.interpolate({inputRange:[0,1],outputRange:['0deg','360deg']});
 return <AuthBackground variant="auth"><SafeAreaView style={styles.safeArea}><View style={styles.container}><Animated.View style={[styles.logo,{opacity,transform:[{scale}]}]}><RqllyText variant="display" align="center">Rqlly</RqllyText></Animated.View><View style={styles.loading}><Animated.View style={[styles.spinner,{transform:[{rotate}]}]}><View style={styles.spinnerAccent}/></Animated.View><RqllyText variant="small" color="brand" align="center">Getting you in...</RqllyText></View><View/></View></SafeAreaView></AuthBackground>
}
const styles=StyleSheet.create({safeArea:{flex:1},container:{flex:1,paddingHorizontal:spacing.xl,alignItems:'center',justifyContent:'space-between',paddingTop:220,paddingBottom:spacing.xxl},logo:{alignItems:'center'},loading:{alignItems:'center',gap:spacing.lg},spinner:{width:38,height:38,borderRadius:19,borderWidth:2,borderColor:'rgba(255,255,255,0.14)',alignItems:'flex-start',justifyContent:'flex-start'},spinnerAccent:{width:18,height:18,borderRadius:9,backgroundColor:colors.connection,marginTop:-2,marginLeft:-2}});
