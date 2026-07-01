//% weight=100 color=#4abcff icon="\uf03e" block="מיזוג ומניפולציית תמונות"
namespace imageArrayMerger {

    /**
     * מקבל מערך של תמונות, משלב את כולן לתמונה אחת ומציג אותה.
     * @param imageList מערך (רשימה) של תמונות לשילוב
     * @param duration הזמן במילשניות להצגת התמונה לפני מחיקה, eg: 1000
     */
    //% block="מזג והצג מערך תמונות %imageList || בזמן תצוגה של %duration מילישניות"
    //% expandableArgumentMode="toggle"
    //% duration.shadow=timePicker
    export function mergeAndShowArray(imageList: Image[], duration?: number): void {
        if (!imageList || imageList.length == 0) return

        basic.clearScreen()

        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                for (let i = 0; i < imageList.length; i++) {
                    let currentImage = imageList[i]
                    if (currentImage && currentImage.pixel(x, y)) {
                        led.plot(x, y) 
                        break 
                    }
                }
            }
        }

        if (duration !== undefined && duration > 0) {
            basic.pause(duration) 
            basic.clearScreen()    
        }
    }

    /**
     * מקבל מחרוזת טקסט וממיר אותה למערך של תמונות (כל אות היא תמונה נפרדת) לפי הפונט המובנה
     * @param text הטקסט שאותו נרצה להפוך למערך תמונות, eg: "ABC"
     */
    //% block="המר טקסט %text למערך תמונות"
    //% text.defl="ABC"
    export function convertTextToImages(text: string): Image[] {
        let resultImages: Image[] = []
        if (!text) return resultImages

        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i)
            
            let charImage = images.createImage(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
            `)

            let fontImage = images.fontImage(char)
            if (fontImage) {
                for (let y = 0; y < 5; y++) {
                    for (let x = 0; x < 5; x++) {
                        if (fontImage.pixel(x, y)) {
                            charImage.setPixel(x, y, true)
                        }
                    }
                }
                resultImages.push(charImage)
            }
        }

        return resultImages
    }

    /**
     * מקבל מחרוזת טקסט בעברית וממיר אותה למערך של תמונות פיקסל לפי סדר האותיות שתספק
     * @param text הטקסט להמרה, eg: "אבא"
     * @param alphabetOrder רשימת משתני האותיות שלך לפי הסדר (א עד ת)
     */
    //% block="המר טקסט עברי %text למערך תמונות לפי רשימת אותיות %alphabetOrder"
    export function convertHebrewTextToImages(text: string, alphabetOrder: Image[]): Image[] {
        let resultImages: Image[] = []
        if (!text || !alphabetOrder || alphabetOrder.length == 0) return resultImages

        let lettersStr = "אבגדהוזחטיכלמנסעפצקרשת"

        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i)
            let index = lettersStr.indexOf(char)
            
            if (index !== -1 && alphabetOrder[index]) {
                resultImages.push(alphabetOrder[index])
            }
        }
        return resultImages
    }
}
