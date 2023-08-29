const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/employees
 * @desc получение всех сотрудников
 * @access private
 */
const all = async (req, res) => {
  try {
    const employee = await prisma.employee.findMany();
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Не удалось получить сотрудников" });
  }
};

/**
 * @route POST /api/employees/add
 * @desc добавление сотрудника
 * @access private
 */
const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res
        .status(400)
        .json({ message: "Пожалуйста заполните обязательные поля" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

/**
 * @route POST /api/employees/remove/:id
 * @desc удаление сотрудника
 * @access private
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    res.status(204).json({ message: "Ok" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

/**
 * @route PUT /api/employees/edit/:id
 * @desc редактирование сотрудника
 * @access private
 */
const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const employee = await prisma.employee.update({
      where: {
        id: id,
      },
      data: body,
    });

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

/**
 * @route GET /api/employees/:id
 * @desc получение сотрудника
 * @access private
 */
const employee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  employee,
};
