package com.bluetooth.bdsk.audio;

import android.content.res.AssetFileDescriptor;
import android.media.MediaPlayer;
import android.util.Log;

import com.bluetooth.bdsk.Constants;
import com.bluetooth.bdsk.R;

import java.io.IOException;

public class AlarmManager {

    private static AlarmManager instance;
    public MediaPlayer mp;

    private AlarmManager() {

    }

    public static synchronized AlarmManager getInstance() {
        if (instance == null)  {
            instance = new AlarmManager();
        }
        return instance;
    }

    public boolean alarmIsSounding() {
        boolean already_playing=false;
        if (mp != null) {
            try {
                already_playing = mp.isPlaying();
            } catch (IllegalStateException e) {
                // means we're not playing since this exception is thrown is isPlaying() is called before MediaPlayer has been initialised or after it has been released
            }
        }
        return already_playing;
    }

    public void soundAlarm(AssetFileDescriptor afd) {
        Log.d(Constants.TAG, "playSound");
        if (!alarmIsSounding()) {
            mp = new MediaPlayer();
            mp.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mp) {
                    Log.d(Constants.TAG, "playSound - alarm playback has completed");
                    mp.reset();
                    mp.release();
                }
            });
            try {
                mp.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(),
                        afd.getLength());
                mp.prepare();
                mp.start();
                afd.close();
            } catch (IllegalArgumentException e) {
                Log.d(Constants.TAG, "playSound - IllegalArgumentException: " + e.getMessage());
            } catch (IllegalStateException e) {
                Log.d(Constants.TAG, "playSound - IllegalStateException: " + e.getMessage());
            } catch (IOException e) {
                Log.d(Constants.TAG, "playSound - IOException: " + e.getMessage());
            }
        } else {
            Log.d(Constants.TAG, "playSound - already playing alarm");
        }
    }

    public void stopAlarm() {
        if (mp != null && mp.isPlaying()) {
            mp.stop();
            mp.reset();
            mp.release();
        }
    }
}
