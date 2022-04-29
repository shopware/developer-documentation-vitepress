# Reacting to cookie consent changes

## Overview

This small guide will bring a short example on how to react on changes for the cookie consent made by the user via JavaScript.

## Prerequisites

This guide was built upon both the [plugin base guide](../plugin-base-guide.md) as well as the [Adding a cookie to the consent manager guide](add-cookie-to-manager.md), so make sure to know those beforehand. Also nice to know is the guide about [Reacting to javascript events](reacting-to-javascript-events.md), since this will be done here, same as how to create and load a JavaScript file in the first place, which can be found [here](add-custom-javascript.md).

## Reacting to cookie configuration changes via JavaScript

Everytime a user saves a cookie configuration, an event is published to the document's event emitter. The event only contains the changeset for the cookie configuration as an object.

In the following example we'll check for a cookie with name `cookie-key-1`, just like we created one of the cookies in our guide about [Adding a cookie to the consent manager](add-cookie-to-manager.md).

You can listen for this event using the following lines:

{% code title="<plugin root>/src/Resources/app/storefront/src/reacting-cookie/reacting-cookie.js" %}
```javascript
import { COOKIE_CONFIGURATION_UPDATE } from 'src/plugin/cookie/cookie-configuration.plugin';

document.$emitter.subscribe(COOKIE_CONFIGURATION_UPDATE, eventCallback);

function eventCallback(updatedCookies) {
    if (typeof updatedCookies.detail['cookie-key-1'] !== 'undefined') {
        // The cookie with the cookie attribute "cookie-key-1" either is set active or from active to inactive
        let cookieActive = updatedCookies.detail['cookie-key-1'];
    } else {
        // The cookie with the cookie attribute "cookie-key-1" was not updated
    }
}
```
{% endcode %}

So first of all we're registering to the event `COOKIE_CONFIGURATION_UPDATE` and apply our own custom callback here. The custom callback then checks for the updated cookies, which are stored in `updatedCookies.detail`. If your cookie is not defined in there, it wasn't changed. If you can find it, it will contain the new active state.

This way you can properly react on cookie consent changes made by the user.

### Loading the JavaScript file

Just like with every custom JavaScript file, you have to load this one as well in your plugin's main entry file, which is the `main.js`.

{% code title="<plugin root>/src/Resources/app/storefront/src/main.js" %}
```javascript
import './reacting-cookie/reacting-cookie'

// Necessary for the webpack hot module reloading server
if (module.hot) {
    module.hot.accept();
}
```
{% endcode %}

And that's it for this guide!

