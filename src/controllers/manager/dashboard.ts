import { Request, Response } from "express";
import mysql from "mysql2";
import { generateResponse } from "../../utils";

import dbConfig from "../../db";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const getDashboardDetails = (req: Request, res: Response) => {
  try {
    pool.getConnection(async (err, connection) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res
          .status(500)
          .json(generateResponse(false, null, "Database connection error"));
      }
      const allMemberCountQuery = `select count(*) as count from users u where role_id = 1`;
     
      const newMemberCountQuery =
        "select count(*) as count from users u where role_id = 1 \
         and YEAR(joined_date) = YEAR(CURRENT_DATE()) \
         AND MONTH(joined_date) = MONTH(CURRENT_DATE())";
      const staffCountQuery =
        "select count(*) as count from users u where not role_id = 1";
      const doctorCountQuery =
        "select count(*) as count from users u where role_id = 3";
      const trainerCountQuery =
        "select count(*) as count from users u where role_id = 2";
      const receptionistCountQuery =
        "select count(*) as count from users u where role_id = 5";
      const memberPaymentStatsQuery =
        "SELECT MONTH (payment_made_date) as month,YEAR (payment_made_date ) as year,SUM(amount) as amount FROM member_payment mp  \
                          GROUP BY  MONTH (payment_made_date) ,YEAR (payment_made_date) ";
      const staffPaymentStatusQuery =
        "SELECT MONTH (payment_made_date) as month,YEAR (payment_made_date ) as year,SUM(amount) as amount FROM staff_payment  \
      GROUP BY  MONTH (payment_made_date) ,YEAR (payment_made_date) ";
      try {
        const [
          allMemberCount,
          newMemberCount,
          staffCount,
          doctorCount,
          trainerCount,
          receptionistCount,
          memberPaymentStats,
          staffPaymentStats,
        ] = await Promise.all([
          getCount(connection, allMemberCountQuery),
          getCount(connection, newMemberCountQuery),
          getCount(connection, staffCountQuery),
          getCount(connection, doctorCountQuery),
          getCount(connection, trainerCountQuery),
          getCount(connection, receptionistCountQuery),
          getStats(connection, memberPaymentStatsQuery),
          getStats(connection, staffPaymentStatusQuery),
        ]);
        res.status(200).json(
          generateResponse(true, {
            allMemberCount,
            newMemberCount,
            staffCount,
            doctorCount,
            trainerCount,
            receptionistCount,
            memberPaymentStats,
            staffPaymentStats,
          })
        );
      } catch (error) {
        res.status(500).json(generateResponse(false, null, "SQL Error"));
      }
      connection.release();
    });
  } catch (err) {
    console.error("Error in getannouncementDetails:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching announcement"));
  }
};

function getCount(connection: Connection, query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (Array.isArray(results) && results.length > 0) {
          const row = results[0] as { count: number }; // Type assertion
          if (row) {
            resolve(row.count);
          }
        }
        reject("Please check the sql query :" + query);
      }
    });
  });
}

function getStats(connection: Connection, query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
