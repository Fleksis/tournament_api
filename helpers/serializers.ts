const blogSerializer = {
  fields: {
    omit: ['userId', 'updatedAt'],
  },
  relations: {
    user: {
      fields: {
        pick: ['firstname', 'lastname', 'email'],
        omit: ['createdAt', 'updatedAt'],
      },
    },
  },
}

export { blogSerializer }
