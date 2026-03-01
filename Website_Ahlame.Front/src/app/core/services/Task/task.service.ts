import { Injectable } from '@angular/core';
export interface Task {
  id: number;
  title: string;
  assignee: string;
  type: 'Task' | 'Bug' | 'Story' | 'Feature';
  priority?: 'Breaking Issue' | 'Release' | 'Customer' | 'Kanban' | 'CustomSample' | 'Feature';
  date?: string;
  status: 'todo' | 'in-progress' | 'done' | 'rejected';
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  status: Task['status'];
  icon: string;
}
@Injectable({
  providedIn: 'root'
})



export class TaskService {
  private tasks: Task[] = [
    // قيد التنفيذ - Andrew Fuller
    { 
      id: 20016, 
      title: 'إصلاح المشاكل المبلغ عنها في متصفح IE.', 
      assignee: 'محمد تايه', 
      type: 'Bug', 
      priority: 'Customer',
      date:'20-5-2026',
      status: 'in-progress'
    },
    { 
      id: 20002, 
      title: 'إضافة التحقق من صحة الإدخال للتعديل.', 
      assignee: 'محمد تايه', 
      type: 'Story', 
      priority: 'Kanban',
      date:'20-5-2026',
      status: 'in-progress'
    },
    { 
      id: 20018, 
      title: 'اختبار وظيفة التعديل', 
      assignee: 'محمد تايه', 
      type: 'Task',
      date:'20-5-2026',
      status: 'todo'
    },
    { 
      id: 20025, 
      title: 'التحقق من صحة التصفية', 
      assignee: 'محمد تايه', 
      type: 'Bug', 
      date:'20-5-2026',
      priority: 'Breaking Issue',
      status: 'in-progress'
    },
    
    // قيد التنفيذ - Janet Leverling
    { 
      id: 20030, 
      title: 'تحسين وظيفة التعديل.', 
      assignee: 'محمد تايه', 
      type: 'Story',
      date:'20-5-2026',
      status: 'in-progress'
    },
    { 
      id: 20031, 
      title: 'إصلاح المشاكل التي أبلغ عنها العميل.', 
      assignee: 'محمد تايه', 
      type: 'Task',
      priority: 'Release',
      date:'20-5-2026',
      status: 'rejected'
    },
    { 
      id: 20017, 
      title: 'تحليل الإجراء المخزن.', 
      assignee: 'محمد تايه', 
      type: 'Task',
      priority: 'Release',
     date:'20-5-2026',
      status: 'rejected'
    },
    { 
      id: 20029, 
      title: 'تصميم لوحة تحكم مستخدم جديدة',
      assignee: 'محمد تايه', 
      type: 'Task',
      date:'20-5-2026',
      status: 'done'
    },
    { 
      id: 20022, 
      title: 'تحديث الوثائق',
      assignee: 'محمد تايه', 
      type: 'Task',
       date:'20-5-2026',
      status: 'done'
    },

    // مهام جديدة
    {
      id: 20040,
      title: 'تحسين أداء قاعدة البيانات',
      assignee: 'محمد تايه', 
      type: 'Feature',
       date:'20-5-2026',
      status: 'todo'
    },
    {
      id: 20041,
      title: 'تحسين أداء قاعدة البيانات',
      assignee: 'محمد تايه', 
      type: 'Task',
      date:'20-5-2026',
      status: 'todo'
    },

    // مهام مراجعة
    {
      id: 20050,
      title: 'تحسين أداء قاعدة البيانات',
      assignee: 'محمد تايه', 
      type: 'Task',
      priority: 'Release',
       date:'20-5-2026',
      status: 'rejected'
    },

    // مهام مكتملة
    {
      id: 20060,
      title: 'إنشاء تقرير المبيعات الشهري',
      assignee: 'محمد تايه', 
      type: 'Task',
       date:'20-5-2026',
      status: 'done'
    }
  ];

  getColumns(): Column[] {
    return [
      {
        id: 'todo',
        title: 'جديد',
        status: 'todo',
        icon: 'fas fa-plus-circle new', 
        tasks: this.tasks.filter(task => task.status === 'todo')
      },
      {
        id: 'in-progress',
        title: 'قيد التنفيذ',
        status: 'in-progress',
      icon: 'fas fa-spinner pending',
        tasks: this.tasks.filter(task => task.status === 'in-progress')
      },
      {
        id: 'rejected',
        title: 'مرفوض',
        status: 'rejected',
      icon: 'fas fa-times-circle rejected', 
        tasks: this.tasks.filter(task => task.status === 'rejected')
      },
      {
        id: 'done',
        title: 'مكتمل',
        status: 'done',
      icon: 'fas fa-check-circle done',
        tasks: this.tasks.filter(task => task.status === 'done')
      }
    ];
  }

  updateTaskStatus(taskId: number, newStatus: Task['status']): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  }

  getTasksByStatus(status: Task['status']): Task[] {
    return this.tasks.filter(task => task.status === status);
  }
}