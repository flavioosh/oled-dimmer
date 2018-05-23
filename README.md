# OLED DIMMER: GNOME extension for OLED display dimming

Unfortunately, regular display dimming does not work on OLED displays. Regular
dimming is done by reducing the brightness of the display backlight. However,
OLED displays don't have a backlight. Therefore, dimming has to be done by
reducing the brightness of the scene.

## A simple GNOME extension to the rescue

This is a simple GNOME extension which:

* Attaches to the brightness level of the GNOME settings daemon.
* Adjusts brightness through xrandr.
* Keeps them in sync.

## Installation

```
git clone https://github.com/flavioosh/oled-dimmer.git ~/.local/share/gnome-shell/extensions/oled-dimmer@flavioosh.com
gnome-shell-extension-tool -e oled-dimmer@flavioosh.com
```

## Known issues

* Doesn't work with Wayland
