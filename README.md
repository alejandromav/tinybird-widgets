# Tinybird Widgets
![](https://github.com/alejandromav/tinybird-widgets/workflows/CI/badge.svg)

# :warning: Use read-only Tinybird tokens, be very careful here with scope and permissions!

### Table of Contents  
- [Usage](#usage)  
- [Development](#development)

# Usage

```html
    <iframe
        frameborder="0"
        width=200
        height=100
        src="https://tinybird-widgets-flame.vercel.app?
            type=number
            &metric=visits
            &title=Visits
            &theme=dark
            &endpoint=https://api.tinybird.co/v0/pipes/analytics.json?token=p.eyJ...
        "
    ></iframe>
```

### Mandatory parameters:

| Parameter | Values |
| --------- | ------ |
| endpoint  | The Tinybird endpoint URL. Must be URL encoded, and the response in JSON format. You can use [this encoder](https://www.urlencoder.org/) manually or the `encodeURI()` function in JavaScript. |
| metric    | The row attribute you want to display as a metric |

### Optional parameters:

| Parameter | Values | Default |
| --------- | ------ | ------- |
| logo      | Display Tinybird logo, `true` or `false` | `number` |
| type      | One of: `number` | `number` |
| title     | The title string you want for the card | |
| theme     | | `light` |
| update-seconds | Integer for how many seconds between updates. 5 seconds is the minimun interval. | `light` |

> :warning: **Usage will increase** when using `update-seconds`, it'll make more requests and Tinybird cost will increase accordingly.

## Supported Widgets

### Number

![Number Screenshot](./assets/number-screenshot.png)

```html
    <iframe
        frameborder="0"
        width=200
        height=100
        src="https://tinybird-widgets-flame.vercel.app?
            type=number
            &metric=visits
            &title=Visits
            &theme=dark
            &endpoint=https%3A%2F%2Fapi.tinybird.co%2Fv0%2Fpipes%2Fuc_visits_date.json%3Ftoken%3Dp.eyJ1...
        "
    ></iframe>
```

# Development
<a name="development"/>

```bash
npm i
npm run start
open ./demo/index.html
```
