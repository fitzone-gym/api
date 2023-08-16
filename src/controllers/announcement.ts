import {Request, Response} from 'express';
import mysql from "mysql2";
import { generateResponse } from "../utils";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "fit_zone",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  export const getAllAnnouncement = (req: Request, res: Response) => {
    const announcementId = req.params.id; // Assuming you pass the announcement ID as a URL parameter
    console.log(announcementId)

    try {
        pool.getConnection((err, connection) => {
          if (err) {
            console.error("Error connecting to the database:", err);
            return res
              .status(500)
              .json(
                generateResponse(false, null, "Database connection error")
              );
          }

        const query = `
            SELECT *
            FROM announcement
         
        `;

        // Execute the query
        connection.query(query, (err, result) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) {
              console.error("Error fetching announcement:", err);
              return res
                .status(500)
                .json(
                  generateResponse(false, null, "Error fetching users")
                );
            }
    
            // if successfully process
            // console.log("Hello")
            res
              .status(200)
              .json(generateResponse(true, result));
          });
        });
      } catch (err) {
        console.error("Error in getannouncementDetails:", err);
        res
          .status(500)
          .json(
            generateResponse(false, null, "Error fetching announcement")
          );
      }
  };

  export const updateAnnouncement = (req: Request, res: Response) => {
    const announcementId = req.params.id;
    const updatedData = req.body;

    console.log("update");
    const recepientsArray = updatedData.recepients.includes(',') ? updatedData.recepients.split(',').map((item: string) => item.trim()) : [updatedData.for];
    console.log(recepientsArray);
  
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
        SET \`for\` = ?, description = ?, title = ?
        WHERE announcement_id = ?`;
        
        connection.query(
            query,
            [recepientsArray.join(', '), updatedData.description, updatedData.title, announcementId],
            (error, results) => {
          connection.release();
  
          if (error) {
            console.error("Error updating announcement:", error);
            return res.status(500).json({ message: "Error updating announcement" });
          }
          return res.status(200).json({ message: "Announcement updated", data: results });
        });
      });
    } catch (err) {
      console.error("Error in updateAnnouncement:", err);
      res.status(500).json(generateResponse(false, null, "Error updating announcement"));
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
              .json(
                generateResponse(false, null, "Database connection error")
              );
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
                .json(
                  generateResponse(false, null, "Error deleting trainer")
                );
            }
    
         // Check if at least one row was affected (trainer deleted successfully)
    if (result) {
      res.status(200).json(generateResponse(true, "Announcement deleted successfully"));
    } else {
      res.status(404).json(generateResponse(false, null, "Announcement not found"));
    }
          });
        });
      } catch (err) {
        console.error("Error in deleteAnnouncement:", err);
        res
          .status(500)
          .json(
            generateResponse(false, null, "Error deleting announcement")
          );
      }
    };

  export const addAnnouncement = (req: Request, res: Response) => {
  
  };