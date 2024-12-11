import OS from '../models/OS.mjs'

export const createOS = async (req, res) => {
    console.log(req.body); 
    try {
        const { user, text } = req.body;

        if (!user || !text) {
            return res.status(400).json({ message: 'User  ID and text are required' });
        }

        const newOS = new OS({ user, text });
        await newOS.save();

        res.status(201).json(newOS);
    } catch (error) {
        console.error('Error details:', error); 
        res.status(500).json({ message: 'Error creating OS', error: error.message });
    }
};

export const getAllOS = async (req, res) => {
    try {
        const osList = await OS.find(); 
        res.status(200).json(osList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching OS', error });
    }
};

export const getOSById = async (req, res) => {
    try {
        const osItem = await OS.findById(req.params.id); 
        if (!osItem) {
            return res.status(404).json({ message: 'OS not found' });
        }
        res.status(200).json(osItem);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching OS', error });
    }
};

export const updateOS = async (req, res) => {
    try {
        const updatedOS = await OS.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOS) {
            return res.status(404).json({ message: 'OS not found' });
        }
        res.status(200).json(updatedOS);
    } catch (error) {
        res.status(500).json({ message: 'Error updating OS', error });
    }
};

export const deleteOS = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOS = await OS.findByIdAndDelete(id); 
        if (!deletedOS) {
            return res.status(404).json({ message: 'OS not found' });
        }

        res.status(200).json({ message: 'OS deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting OS', error: error.message });
    }
};
