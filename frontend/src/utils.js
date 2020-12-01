/**
 * Order tasks such that completed tasks are after on going
 * @param {object[]} tasks
 */
export const orderTasks = tasks => {
  const completedTasks = []
  const onGoingTasks = []
  tasks.forEach(task => {
    if (task.complete) completedTasks.push(task)
    else onGoingTasks.push(task)
  })
  return [...onGoingTasks, ...completedTasks]
}

export const limitLongStr = (text, limit) => {
  if (text.length > limit) return `${text.substring(0, limit)}...`
  return text
}