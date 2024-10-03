CREATE TABLE tasks (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    title VARCHAR(255) NOT NULL COMMENT 'Title of the task',
    description VARCHAR(255) NOT NULL COMMENT 'Description of the task',
    status ENUM('done', 'inProgress', 'todo') NOT NULL COMMENT 'Status of the task',
    userId INT COMMENT 'User Id',
    parentTaskId INT COMMENT 'Parent Task Id',
    subTasks TEXT COMMENT 'Sub Tasks',
    deadline DATETIME COMMENT 'Deadline',
    priority INT COMMENT 'Priority',
    progress INT COMMENT 'Progress',
    completedAt DATETIME COMMENT 'Completed At',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time'
) COMMENT='Table for tasks';