package com.bottomsnode.sms;

import android.Manifest;
import android.content.pm.PackageManager;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.JSObject;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import com.getcapacitor.annotation.Permissions;
import com.getcapacitor.PluginMethod;

@CapacitorPlugin(
    name = "Sms",
    permissions = {
        @Permission(
            alias = "sms",
            strings = {
                Manifest.permission.RECEIVE_SMS,
                Manifest.permission.READ_SMS
            }
        )
    }
)
public class SmsPlugin extends Plugin {

    private PluginCall savedCall;

    @Override
    public void load() {
        SmsReceiver.setBridge(getBridge());
    }

    @PluginMethod
    public void requestPermissions(PluginCall call) {
        savedCall = call;

        boolean receiveGranted =
                ContextCompat.checkSelfPermission(getContext(), Manifest.permission.RECEIVE_SMS)
                        == PackageManager.PERMISSION_GRANTED;

        boolean readGranted =
                ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_SMS)
                        == PackageManager.PERMISSION_GRANTED;

        if (receiveGranted && readGranted) {
            JSObject ret = new JSObject();
            ret.put("granted", true);
            call.resolve(ret);
            return;
        }

        requestPermissionForAlias("sms", call, "handlePermissionResult");
    }

    @PermissionCallback
    private void handlePermissionResult(PluginCall call) {
        if (call == null) call = savedCall;
        if (call == null) return;

        boolean receiveGranted =
                ContextCompat.checkSelfPermission(getContext(), Manifest.permission.RECEIVE_SMS)
                        == PackageManager.PERMISSION_GRANTED;

        boolean readGranted =
                ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_SMS)
                        == PackageManager.PERMISSION_GRANTED;

        JSObject ret = new JSObject();
        ret.put("granted", receiveGranted && readGranted);

        call.resolve(ret);
    }
}
