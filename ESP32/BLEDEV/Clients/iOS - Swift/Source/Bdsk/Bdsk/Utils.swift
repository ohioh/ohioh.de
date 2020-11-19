import UIKit

class Utils {
    
    static let sharedInstance = Utils()
    /*
     * Use this function as follows:
     *
     * utils.info(message : "Scanning", ui : self,
     *            cbOK: {
     *               print("OK callback")
     *             })
     *
     */
    func info(message: String, ui: UIViewController, cbOK: @escaping () -> Void) {
        let dialog = UIAlertController(title: "Information", message: message, preferredStyle: UIAlertController.Style.alert)
        let OKAction = UIAlertAction(title: "OK", style: .default) {
            (action) in cbOK()
        }
        dialog.addAction(OKAction)
        // Present the dialog
        ui.present(dialog,animated: false, completion: nil)
    }
    
    func error(message: String, ui: UIViewController, cbOK: @escaping () -> Void) {
        let dialog = UIAlertController(title: "ERROR", message: message, preferredStyle: UIAlertController.Style.alert)
        let OKAction = UIAlertAction(title: "OK", style: .default) {
            (action) in cbOK()
        }
        dialog.addAction(OKAction)
        // Present the dialog
        ui.present(dialog,animated: false, completion: nil)
    }

}

