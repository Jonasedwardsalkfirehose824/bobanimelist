export default {
  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
  extends: [
    "stylelint-config-standard", // For standard CSS rules
    "stylelint-config-recommended-scss", // For SCSS specific rules
  ],
  plugins: [
    "stylelint-order", // To enforce property order
  ],
  rules: {
    // Removed strict BEM naming pattern to allow more flexible class names
    // Removed font property restrictions to allow proper typography
    // Disable rules that interfere with build-generated CSS patterns
    "no-duplicate-selectors": null,
    "selector-class-pattern": null, // Allow any class name pattern
    "declaration-block-single-line-max-declarations": null, // Allow multiple declarations in single line
    "color-hex-length": null, // Allow long hex values
    "color-function-notation": null, // Allow old color function notation
    "alpha-value-notation": null, // Allow decimal alpha values
    "color-function-alias-notation": null, // Allow rgba notation
    "at-rule-empty-line-before": null, // Remove empty line requirements
    "rule-empty-line-before": null, // Remove empty line requirements
    "declaration-empty-line-before": null, // Remove empty line requirements
    "function-url-quotes": null, // Remove url quote requirements
    "property-no-vendor-prefix": null, // Allow vendor prefixes
    "selector-pseudo-element-colon-notation": null, // Allow single colon
    "selector-pseudo-class-no-unknown": null, // Allow global selectors
    "keyframes-name-pattern": null, // Allow any keyframe naming
    "keyframe-selector-notation": null, // Allow any keyframe selector notation
    "media-feature-range-notation": null, // Allow any media range notation
    "no-descending-specificity": null, // Allow descending specificity
    "selector-not-notation": null, // Allow simple :not() notation
    "scss/at-extend-no-missing-placeholder": null, // Allow extending classes directly
    "scss/no-global-function-names": null, // Allow global function names
    "scss/operator-no-unspaced": null, // Allow unspaced operators
    "declaration-block-no-duplicate-properties": null, // Allow duplicate properties
    "declaration-block-no-redundant-longhand-properties": null, // Allow redundant properties
    "selector-attribute-quotes": null, // Allow unquoted attribute values
    "length-zero-no-unit": null, // Allow units on zero values where needed
    "value-keyword-case": null, // Allow any case for keywords
  },
};
