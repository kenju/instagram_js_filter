FORMAT: 1A

# insta-filter

API documentation for insta-filter

## What

* Server-side image processing services

::: note

## Info

:tada: We are welcome to your PR :tada:

- [insta-filter](https://github.com/KENJU/instagram_js_filter.git)

:::

# Group Info

## Process Images [/process]

### List All Info [GET]

+ Response 200 (application/json)
    + Attribute
        + data (array)
            * (object)
                + url: https://sample-image/image.jpg (string),
                + type: original (string)

### Process Images [POST]

+ Request (application/json)
    + Attribute
        + data (array)
            * (object)
                + url: https://sample-image/image.jpg (string),
                + type: original (string)

+ Response 200 (application/json)
    + Attribute
        + data (array)
            * (object)
                + url: https://sample-image/image.jpg (string),
                + type: original (string)

