//% weight=100 color=#4abcff icon="\uf03e" block="מיזוג מערך תמונות"
namespace imageArrayMerger {

    /**
     * מקבל מערך של תמונות, משלב את כולן לתמונה אחת ומציג אותה על המסך
     * @param imageList מערך (רשימה) של תמונות לשילוב
     */
    //% block="מזג והצג מערך תמונות %imageList"
    export function mergeAndShowArray(imageList: Image[]): void {
        // הגנה מפני מערך ריק
        if (!imageList || imageList.length == 0) return

        // יצירת תצוגת בסיס ריקה (כל הלדים כבויים)
        let finalImage = images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
        `)

        // לולאה שעוברת על כל ה-X וה-Y של מסך הלדים (5x5)
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                
                // לולאה שעוברת על כל התמונות שקיבלנו במערך
                for (let img of imageList) {
                    // אם הלד דולק בתמונה הנוכחית
                    if (img.pixel(x, y)) {
                        finalImage.setPixel(x, y, true) // נדליק אותו בתמונה הסופית
                        break // מצאנו שהלד דולק, אפשר לעבור ללד הבא ולא לבדוק את שאר התמונות במערך
                    }
                }

            }
        }

        // הצגת התוצאה הסופית המשולבת על מסך המיקרוביט
        finalImage.showImage(0)
    }
}
