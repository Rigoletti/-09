import Role from '../models/Role.mjs';
import User from '../models/User.mjs';
export const createRole = async (req, res) => {
    try {
        const newRole = new Role(req.body);
        await newRole.save();
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ message: 'Error creating role', error });
    }
};

export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roles', error });
    }
};

export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching role', error });
    }
};

export const updateRole = async (req, res) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error });
    }
};
export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;


        const deletedRole = await Role.findByIdAndDelete(id);
        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }

        await User.deleteMany({ role: id });

        res.status(200).json({ message: 'Role and associated users deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting role', error: error.message });
    }
};