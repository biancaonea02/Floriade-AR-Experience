package com.firstreactnative;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactMethod;

public class MainActivity extends ReactActivity {

  @ReactMethod
  public void addListener(String eventName) {

  }

  @ReactMethod
  public void removeListeners(Integer count) {

  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "firstreactnative";
  }
}
