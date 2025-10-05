/*import Service from "./../services/timer.service.js";

const service = new Service();

export const createTimer = async (req, res, next) => {
  try {
    const { userId, taskId, type, duration } = req.body;
    const timer = await service.createTimer(userId, taskId, type, duration);
    res.status(201).json(timer);
  } catch (error) {
    next(error);
  }
};
export const startTimer = async (req, res, next) => {
  try {
    const { timerId } = req.params;
    const timer = await service.startTimer(timerId);
    res.status(200).json(timer);
  } catch (error) {
    next(error);
  }
};
export const pauseTimer = async (req, res, next) => {
  try {
    const { timerId } = req.params;
    const timer = await service.pauseTimer(timerId);
    res.status(200).json(timer);
  } catch (error) {
    next(error);
  }
};
export const resumeTimer = async (req, res, next) => {
  try {
    const { timerId } = req.params;
    const timer = await service.resumeTimer(timerId);
    res.status(200).json(timer);
  } catch (error) {
    next(error);
  }
};
export const getTimerStatus = async (req, res, next) => {
  try {
    const { timerId } = req.params;
    const timer = await service.getTimer(timerId);
    res.status(200).json(timer);
  } catch (error) {
    next(error);
  }
};
export const deleteTimer = async (req, res, next) => {
  try {
    const { timerId } = req.params;
    await service.deleteTimer(timerId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
*/
