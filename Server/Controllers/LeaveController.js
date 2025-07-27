import Leave from '../Modules/Leave.js'

const addLeave = async (req, res) => {
  try {
    console.log('Incoming body:', req.body);  // Add this
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const newLeave = new Leave({
      employeeId: userId,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await newLeave.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Leave Add Error:', error); // Add label
    return res.status(500).json({ success: false, error: 'Leave Add Server Error' });
  }
};

const getLeave = async (req, res) => {
  try {
    const userId = req.params.id;
    const leaves = await Leave.find({ employeeId: userId });
    res.json({ success: true, leaves });
  } catch (error) {
    console.error('Error fetching leaves:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


export {addLeave,getLeave}