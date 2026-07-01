//% weight=100 color=#4abcff icon="\uf03e" block="מיזוג מערך תמונות"
namespace imageArrayMerger {

    /**
     * מקבל מערך של תמונות, משלב את כולן לתמונה אחת ומציג אותה.
     * בלחיצה על + ניתן לקבוע לכמה זמן התמונה תוצג לפני מחיקת המסך.
     * @param imageList מערך (רשימה) של תמונות לשילוב
     * @param duration הזמן במילשניות להצגת התמונה לפני מחיקה, eg: 1000
     */
    //% block="מזג והצג מערך תמונות %imageList || בזמן תצוגה של %duration מילישניות"
    //% expandableArgumentMode="toggle"
    //% duration.shadow=timePicker
    export function mergeAndShowArray(imageList: Image[], duration?: number): void {
        // הגנה ראשונית - אם המערך ריק או לא קיים, אל תעשה כלום
        if (!imageList || imageList.length == 0) return

        // ניקוי זמני של המסך כדי לבנות את השכבות מחדש
        basic.clearScreen()

        // לולאה כפולה שרצה על כל 25 הלדים של המיקרוביט (מטריצה של 5 על 5)
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                
                // לולאה פנימית שרצה על כל התמונות שקיבלנו בתוך המערך
                for (let i = 0; i < imageList.length; i++) {
                    let currentImage = imageList[i]
                    
                    // בדיקה האם הפיקסל הנוכחי דולק בתמונה הזו
                    if (currentImage.pixel(x, y)) {
                        led.plot(x, y) // הדלקת הלד ישירות על מסך המיקרוביט
                        break // מצאנו שהלד דולק באחת התמונות, אין צורך לבדוק את השאר עבור פיקסל זה
                    }
                }

            }
        }

        // טיפול בזמן ההצגה ומחיקת המסך (אם המשתמש פתח את ה-+ והגדיר זמן)
        if (duration !== undefined && duration > 0) {
            basic.pause(duration) // השהיית התוכנית למשך הזמן שנקבע
            basic.clearScreen()    // כיבוי כל הלדים
        }
    }
}
