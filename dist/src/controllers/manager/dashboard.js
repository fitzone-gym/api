"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardDetails = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const utils_1 = require("../../utils");
const db_1 = __importDefault(require("../../db"));
const pool = mysql2_1.default.createPool({
    host: db_1.default.host,
    user: db_1.default.user,
    password: db_1.default.password,
    database: db_1.default.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const getDashboardDetails = (req, res) => {
    try {
        pool.getConnection(async (err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return res
                    .status(500)
                    .json((0, utils_1.generateResponse)(false, null, "Database connection error"));
            }
            const allMemberCountQuery = `select count(*) as count from users u where role_id = 1`;
            const newMemberCountQuery = "select count(*) as count from users u where role_id = 1 \
         and YEAR(joined_date) = YEAR(CURRENT_DATE()) \
         AND MONTH(joined_date) = MONTH(CURRENT_DATE())";
            const staffCountQuery = "select count(*) as count from users u where not role_id = 1";
            const doctorCountQuery = "select count(*) as count from users u where role_id = 3";
            const trainerCountQuery = "select count(*) as count from users u where role_id = 2";
            const receptionistCountQuery = "select count(*) as count from users u where role_id = 5";
            const memberPaymentStatsQuery = `WITH RECURSIVE PaymentSchedule AS (
          SELECT
              2023 AS year,
              1 AS month
          UNION ALL
          SELECT
              CASE
                  WHEN month = 12 THEN year + 1
                  ELSE year
              END AS year,
              CASE
                  WHEN month = 12 THEN 1
                  ELSE month + 1
              END AS month
          FROM PaymentSchedule
          WHERE year <= 2024
      )
      
      SELECT 
          ps.year,
          ps.month,
          IFNULL(SUM(
              CASE
                  WHEN mp.payment_details = 'annual' THEN
                      (mp.amount / 12) * (
                          CASE
                              WHEN ps.month >= MONTH(mp.payment_made_date) THEN 1
                              ELSE 0
                          END
                      )
                  WHEN mp.payment_details = '6 months' THEN
                      (mp.amount / 6) * (
                          CASE
                              WHEN ps.month >= MONTH(mp.payment_made_date) AND ps.month < MONTH(mp.payment_made_date) + 6 THEN 1
                              ELSE 0
                          END
                      )
                  ELSE
                      (mp.amount / (CASE WHEN mp.payment_details = 'monthly' THEN 1 ELSE 12 END)) * (
                          CASE
                              WHEN ps.month = MONTH(mp.payment_made_date) THEN 1
                              ELSE 0
                          END
                      )
              END
          ), 0) AS amount
      FROM PaymentSchedule ps
      LEFT JOIN member_payment mp ON ps.year = YEAR(mp.payment_made_date)
      GROUP BY ps.year, ps.month
      ORDER BY ps.year, ps.month;
      `;
            const staffPaymentStatusQuery = "SELECT MONTH (payment_made_date) as month,YEAR (payment_made_date ) as year,SUM(amount) as amount FROM staff_payment  \
      GROUP BY  MONTH (payment_made_date) ,YEAR (payment_made_date) ";
            try {
                const [allMemberCount, newMemberCount, staffCount, doctorCount, trainerCount, receptionistCount, memberPaymentStats, staffPaymentStats,] = await Promise.all([
                    getCount(connection, allMemberCountQuery),
                    getCount(connection, newMemberCountQuery),
                    getCount(connection, staffCountQuery),
                    getCount(connection, doctorCountQuery),
                    getCount(connection, trainerCountQuery),
                    getCount(connection, receptionistCountQuery),
                    getStats(connection, memberPaymentStatsQuery),
                    getStats(connection, staffPaymentStatusQuery),
                ]);
                res.status(200).json((0, utils_1.generateResponse)(true, {
                    allMemberCount,
                    newMemberCount,
                    staffCount,
                    doctorCount,
                    trainerCount,
                    receptionistCount,
                    memberPaymentStats,
                    staffPaymentStats,
                }));
            }
            catch (error) {
                res.status(500).json((0, utils_1.generateResponse)(false, null, "SQL Error"));
            }
            connection.release();
        });
    }
    catch (err) {
        console.error("Error in getannouncementDetails:", err);
        res
            .status(500)
            .json((0, utils_1.generateResponse)(false, null, "Error fetching announcement"));
    }
};
exports.getDashboardDetails = getDashboardDetails;
function getCount(connection, query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                if (Array.isArray(results) && results.length > 0) {
                    const row = results[0]; // Type assertion
                    if (row) {
                        resolve(row.count);
                    }
                }
                reject("Please check the sql query :" + query);
            }
        });
    });
}
function getStats(connection, query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}
