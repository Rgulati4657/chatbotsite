const axios = require('axios');

// Validate if domain is reachable
exports.validateDomain = async (req, res) => {
  let { domain } = req.body;

  if (!domain) {
    return res.status(400).json({
      success: false,
      message: 'Domain is required',
    });
  }

  if (!domain.startsWith('http://') && !domain.startsWith('https://')) {
    domain = 'https://' + domain;
  }

  try {
    const response = await axios.get(domain, { timeout: 5000 });

    if (response.status >= 200 && response.status < 400) {
      return res.status(200).json({
        success: true,
        message: 'Website is reachable',
        status: response.status,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `Website responded with status code ${response.status}`,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Website is not reachable',
      error: error.message,
    });
  }
};
