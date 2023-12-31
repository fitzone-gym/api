import { Request, Response } from "express";
import mysql from "mysql2";
import { generateResponse } from "../../utils";

import dbConfig from "../../db";

const pool = mysql.createPool({
  host: dbConfig.host,
  // port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
export const getAllAnnouncement = (req: Request, res: Response) => {
  const announcementId = req.params.id; // Assuming you pass the announcement ID as a URL parameter
  console.log(announcementId);

  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res
          .status(500)
          .json(generateResponse(false, null, "Database connection error"));
      }

      // const query = `
      //       SELECT *
      //       FROM announcement

      //   `;

      const query = `
        SELECT * 
FROM announcement
WHERE date_from < CURDATE() AND date_to > CURDATE()
ORDER BY create_date DESC;`;

      // Execute the query
      connection.query(query, (err, result) => {
        // Release the connection back to the pool
        connection.release();

        if (err) {
          console.error("Error fetching announcement:", err);
          return res
            .status(500)
            .json(generateResponse(false, null, "Error fetching users"));
        }

        // if successfully process
        // console.log("Hello")
        res.status(200).json(generateResponse(true, result));
      });
    });
  } catch (err) {
    console.error("Error in getannouncementDetails:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching announcement"));
  }
};

export const updateAnnouncement = (req: Request, res: Response) => {
  const announcementId = req.params.id;
  const updatedData = req.body;

  console.log("update", updatedData);
  const recepientsArray = updatedData.recepients?.includes(",")
    ? updatedData.recepients.split(",").map((item: string) => item.trim())
    : [updatedData.receiver];
  console.log("recepientsArray", recepientsArray);

  console.log(announcementId);
  console.log(updatedData);
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res
          .status(500)
          .json(generateResponse(false, null, "Database connection error"));
      }

      const query = `UPDATE announcement
        SET \`receiver\` = ?, description = ?, title = ?
        WHERE announcement_id = ?`;

      connection.query(
        query,
        [
          recepientsArray.join(", "),
          updatedData.description,
          updatedData.title,
          announcementId,
        ],
        (error, results) => {
          connection.release();

          if (error) {
            console.error("Error updating announcement:", error);
            return res
              .status(500)
              .json({ message: "Error updating announcement" });
          }
          return res
            .status(200)
            .json({ message: "Announcement updated", data: results });
        }
      );
    });
  } catch (err) {
    console.error("Error in updateAnnouncement:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error updating announcement"));
  }
};

export const deleteAnnouncement = (req: Request, res: Response) => {
  //console.log("JJ")
  try {
    // console.log("test")
    const announcementId = req.params.announcement_id;
    // Assuming the trainer ID is passed as a parameter in the request URL
    console.log("frm controller", announcementId);
    pool.getConnection((err, connection) => {
      if (err) {
        // console.error("Error connecting to the database:", err);
        return res
          .status(500)
          .json(generateResponse(false, null, "Database connection error"));
      }
      // console.log("Query up")
      const deleteQuery = `
          DELETE FROM announcement
          WHERE announcement_id = ?;               
        `;

      // Execute the delete query with the provided trainerId
      connection.query(deleteQuery, [announcementId], (err, result) => {
        connection.release(); // Release the connection back to the pool

        if (err) {
          console.error("Error deleting announcement:", err);
          return res
            .status(500)
            .json(generateResponse(false, null, "Error deleting trainer"));
        }

        // Check if at least one row was affected (trainer deleted successfully)
        if (result) {
          res
            .status(200)
            .json(generateResponse(true, "Announcement deleted successfully"));
        } else {
          res
            .status(404)
            .json(generateResponse(false, null, "Announcement not found"));
        }
      });
    });
  } catch (err) {
    console.error("Error in deleteAnnouncement:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error deleting announcement"));
  }
};

export const addAnnouncement = (req: Request, res: Response) => {
  try {
    let reqBody = req.body;
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res
          .status(500)
          .json(generateResponse(false, null, "Database connection error"));
      }

      const query =
        "INSERT INTO `announcement` ( `title`, `receiver`, `description` , `date_from`, `date_to`) " +
        "VALUES ( ?, ?, ?, ?, ?);";

      // Execute the query
      connection.query(
        query,
        [
          reqBody.heading,
          reqBody.receiver,
          reqBody.body,
          reqBody.from,
          reqBody.to,
        ],
        (err, result) => {
          // Release the connection back to the pool
          connection.release();

          if (err) {
            console.error("Error fetching Announcement", err);
            return res
              .status(500)
              .json(generateResponse(false, null, "Error fetching users"));
          }
          res.status(200).json(generateResponse(true, result));
        }
      );
    });
  } catch (err) {
    console.error("Error in creating Announcement:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error creating Announcement"));
  }
};

export const getAnnouncements_Receptionist = (req: Request, res: Response) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res
          .status(500)
          .json(generateResponse(false, null, "Database connection error"));
      }

      const query = `SELECT * FROM announcement2 WHERE for = 'Receptionist' `;

      // Execute the query
      connection.query(query, (err, result) => {
        // Release the connection back to the pool
        connection.release();

        if (err) {
          console.error("Error fetching Announcements", err);
          return res
            .status(500)
            .json(generateResponse(false, null, "Error fetching users"));
        }

        // if successfully process
        // console.log("Hello")
        res.status(200).json(generateResponse(true, result));
      });
    });
  } catch (err) {
    console.error("Error in getting Announcements:", err);
    res
      .status(500)
      .json(generateResponse(false, null, "Error fetching Announcements"));
  }
};
