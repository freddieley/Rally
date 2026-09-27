import { Platform } from 'react-native';

// react-native-web forwards `dataSet` to `data-*` attributes; not in TextInputProps' RN types.
export type WebDataSetProps = { dataSet?: Record<string, string> };

// Opts out of 3rd-party password manager highlight/autofill overlays (LastPass, 1Password,
// Bitwarden, Dashlane), which paint their own colors outside the page's CSS and ignore it.
const passwordManagerIgnoreAttrs = {
  rqllyInput: 'true',
  lpignore: 'true',
  bwignore: 'true',
  '1pIgnore': 'true',
  formType: 'other',
};

export const autofillDataSet = {
  dataSet: passwordManagerIgnoreAttrs,
} as WebDataSetProps;

// Marks an input so its autofill highlight is clipped to a border radius (see ensureWebAutofillRoundedCorners).
export const roundedAutofillDataSet = {
  dataSet: {
    ...passwordManagerIgnoreAttrs,
    rqllyInputRounded: 'true',
  },
} as WebDataSetProps;

const STYLE_ID = 'rqlly-input-autofill-reset';
const RADIUS_STYLE_ID = 'rqlly-input-autofill-radius';

// Browsers paint autofilled inputs with their own background/text color;
// override it so autofilled fields stay in sync with the dark theme.
export function ensureWebAutofillReset(textColor: string, backgroundColor: string) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') {
    return;
  }

  const styleEl = document.getElementById(STYLE_ID) ?? document.createElement('style');
  styleEl.id = STYLE_ID;
  styleEl.textContent = `
    input[data-rqlly-input]:-webkit-autofill,
    input[data-rqlly-input]:-webkit-autofill:hover,
    input[data-rqlly-input]:-webkit-autofill:focus,
    input[data-rqlly-input]:-webkit-autofill:active,
    input[data-rqlly-input]:-internal-autofill-selected,
    input[data-rqlly-input]:-internal-autofill-previewed {
      -webkit-text-fill-color: ${textColor} !important;
      -webkit-box-shadow: 0 0 0px 1000px ${backgroundColor} inset !important;
      box-shadow: 0 0 0px 1000px ${backgroundColor} inset !important;
      caret-color: ${textColor} !important;
      transition: background-color 9999s ease-in-out 0s, color 9999s ease-in-out 0s;
    }

    input[data-rqlly-input]:autofill {
      color: ${textColor} !important;
    }
  `;
  document.head.appendChild(styleEl);
}

// The browser clips the autofill fill to the input's own border-radius, so give
// `roundedAutofillDataSet` inputs the same radius as their container (SearchBar opts out).
export function ensureWebAutofillRoundedCorners(borderRadius: number) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') {
    return;
  }

  const styleEl = document.getElementById(RADIUS_STYLE_ID) ?? document.createElement('style');
  styleEl.id = RADIUS_STYLE_ID;
  styleEl.textContent = `
    input[data-rqlly-input-rounded] {
      border-radius: ${borderRadius}px !important;
    }
  `;
  document.head.appendChild(styleEl);
}

