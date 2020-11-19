import AVFoundation

class AlarmManager : NSObject, AVAudioPlayerDelegate {
    
    var player: AVAudioPlayer?
    
    static let sharedInstance = AlarmManager()
    
    func soundAlarm() {
        print("soundAlarm")
        let url = Bundle.main.url(forResource: "alarm", withExtension: "mp3")!
        do {
            try AVAudioSession.sharedInstance().setCategory(AVAudioSession.Category.playback)
            try AVAudioSession.sharedInstance().setActive(true)
            player = try AVAudioPlayer(contentsOf: url)
            if let plyr = player {
                plyr.delegate = self
                plyr.prepareToPlay()
                plyr.play()
            }
        } catch let error {
            print("soundAlarm \(error.localizedDescription)")
        }
    }
    
    func alarmIsSounding()->Bool {
        if (player == nil) {
            return false
        }
        
        if let plyr = player {
            return plyr.isPlaying
        } else {
            return false
        }
    }
    
    func stopAlarm() {
        if let plyr = player {
            plyr.stop()
        }
    }
    
}
