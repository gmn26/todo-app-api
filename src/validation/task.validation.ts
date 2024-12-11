import { z, ZodType } from "zod";

export class TaskValidation {
    static readonly ADD: ZodType = z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(1).max(255),
        dueDate: z.string(),
    });

    static readonly ID: ZodType = z.string();
}