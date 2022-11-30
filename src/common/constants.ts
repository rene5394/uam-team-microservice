export enum RabbitMQ {
  TeamQueue = 'team'
}

export const paginationLimit = {
  users: 10,
  employees: 10,
  members: 10
}

export const UserStatus = {
  active : 1,
  inactive : 3
}

export const TeamStatus = {
  active : 0,
  inactive : 1
}

export const SupportTeamMemberStatus = {
  inactive : 0,
  active : 1
}

export const RequestStatus = {
  pending : 1,
  approved : 2,
  denied: 3,
  canceled: 4
}

