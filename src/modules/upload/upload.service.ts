import Excel from "exceljs";
import { importExcelDataToSQL, getUserIdByName } from "./upload.resource";
import { logger } from "../../services/logging.service";

export const uploadTurnstileService = async (file): Promise<boolean> => {
    try {
        const wb = new Excel.Workbook();
        wb.xlsx.load(file.data).then(async function() {
            const sh = wb.getWorksheet(1);
            let days: Date[] = [];
            sh.getRow(3).eachCell((r) => {
                const day = _getDaysFromColumn(r);
                days.push(day);
            });
            for (let i = 4; i <= sh.rowCount; i++) {
                const row = sh.getRow(i);
                const userName = row.getCell(1).value;
                for (let j = 2, dayIndex = 0; j < row.cellCount; j++, dayIndex++) {
                    const minutes = _getMinutesFromColumn(row.getCell(j));
                    // get userId by userName ..
                    const userId = await getUserIdByName(String(userName));
                    if (userId) {
                        await importExcelDataToSQL(userId, days[dayIndex], minutes);
                    }
                }
            }
        });
        return true;
    } catch (error) {
        logger.error(`${error.message}`);
        return false;
    }
};

const _getDaysFromColumn = (value: Excel.Cell) => {
    const str = value.toCsvString();
    const [dateValues] = str.split("T");
    return new Date(dateValues);
};

const _getMinutesFromColumn = (value: Excel.Cell): number => {
    let str = value.toCsvString();
    const [dateValues, timeValues] = str.split("T");
    const date = new Date(dateValues + " " + timeValues);
    return date.getUTCMinutes() + (date.getUTCHours() * 60);
};