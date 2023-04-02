import { query } from "../../services/db.service";

export const getUserIdByName = async (username: string) => {
    const q = `select id
               from users
               where username = $1;`;
    const { rows } = await query(q, [username]);
    if (rows.length !== 0)
        return rows[0].id;
};