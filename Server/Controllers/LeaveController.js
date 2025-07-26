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


export {addLeave}