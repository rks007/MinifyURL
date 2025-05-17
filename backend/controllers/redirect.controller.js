import Url from "../models/url.model.js";


export const redirectUrl = async (req, res) => {
    try {

        const shortId  = req.params.shortId;

        const isValidShortId = await Url.findOneAndUpdate({ shortId }, { $inc: { clicks: 1 } });
        if (!isValidShortId) {
            return res.status(404).json({ message: "URL not found" });
        }

        res.redirect(isValidShortId.originalUrl);


        
    } catch (error) {
        console.error("Error in redirectUrl controller:", error);
        return res.status(500).json({ message: "Server error" });
    }
}