

const onlineAgents = new Set();

module.exports = {
  addAgent: (agentId) => onlineAgents.add(agentId),
  removeAgent: (agentId) => onlineAgents.delete(agentId),
  isAnyAgentOnline: () => onlineAgents.size > 0,
  getOnlineAgents: () => Array.from(onlineAgents),
};
