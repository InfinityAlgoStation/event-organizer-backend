const User = require('../models/UsersModel');
const { authenticate, authorize } = require('../middleware/auth');

const getAllCustomers = async (req, res) => {
  try {
    // Authorization: Only Admin can see the list of all customers
    if (!authorize('admin')) {
      return res.status(403).json({ message: 'You are not allowed to do this' });
    }

    const users = await User.find({ role: 'customer' }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Authorization: Only Admin and Party Center Manager can access the customer's details
    if (!authorize(['admin', 'partyCenterManager'])) {
      return res.status(403).json({ message: 'You are not allow to do this' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCustomerProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'The profile you are loking for is  not found' });
    }

    // Authorization: Customer can only access their own profile
    if (userId !== user._id.toString()) {
      return res.status(403).json({ message: 'You are not allow to do this..only the profile owner can access this' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { userId } = req.user;
    const { username, email, address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, address },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Authorization: Customer can only update their own profile
    if (userId !== updatedUser._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports  = {
    getAllCustomers,
    getCustomer,
    getCustomerProfile,
    updateCustomer,    
}

