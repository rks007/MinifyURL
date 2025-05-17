import { nanoid } from "nanoid";
import Url from "../models/url.model.js";


export const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;
    try {
        
        if (!originalUrl) {
          return res.status(400).json({ message: "Please provide a URL" });
        }

        // Check if the URL is valid
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlRegex.test(originalUrl)) {
            return res.status(400).json({ message: "Please provide a valid URL" });
        }
        
        // Check if the URL already exists in the database
        const existingUrl = await Url.findOne({ originalUrl });
        if (existingUrl) {
            return res.status(200).json({
                message: "URL already exists",
                data: {
                    shortId: existingUrl.shortId,
                    originalUrl: existingUrl.originalUrl,
                    shortUrl: existingUrl.shortUrl,
                },
            });
        }
    
        const shortId = nanoid(8);

        const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;

        const shortenedUrl = await Url.create({
            shortId,
            originalUrl,
            shortUrl,
        })
        
        return res.status(201).json({
            message: "URL shortened successfully",
            data: {
                shortId,
                originalUrl,
                shortUrl,
            },
        });

    } catch (error) {
        console.error("Error in shortenUrl controller:", error);
        return res.status(500).json({ message: "Server error" });
        
    }



}