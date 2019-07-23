package com.satoshisoup;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;

public class MainActivity extends ReactActivity {

  private BroadcastReceiver mEventReciever = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      MainActivity.this.onNewIntent(intent);
    }
  };

  @Override
  protected String getMainComponentName() {
    return "SatoshiSoup";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }

 

  @Override
  protected void onStart() {
    super.onStart();
    LocalBroadcastManager.getInstance(this).registerReceiver(mEventReciever, new IntentFilter("ACTION_EVENT"));
  }

  @Override
  protected void onStop() {
    super.onStop();
    LocalBroadcastManager.getInstance(this).unregisterReceiver(mEventReciever);
  }
}
