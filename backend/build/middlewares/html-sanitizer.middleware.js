"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const user_service_1 = __importDefault(require("../api/user/user.service"));
const getIsAdminUser = async (req) => {
    try {
        const { loggedinUserId } = req;
        if (!loggedinUserId)
            return false;
        const user = await user_service_1.default.getById(loggedinUserId);
        if (!user)
            return false;
        return user.roles.includes("admin");
    }
    catch (error) {
        return false;
    }
};
const requestSanitizer = async (req, res, next) => {
    const isAdminUser = await getIsAdminUser(req);
    if (isAdminUser)
        return next();
    const { body } = req;
    const { params } = req;
    const { query } = req;
    if (body) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sanitizeBody = (body) => {
            for (const key in body) {
                if (typeof body[key] === "string") {
                    body[key] = (0, sanitize_html_1.default)(body[key]);
                }
                else if (typeof body[key] === "object") {
                    sanitizeBody(body[key]);
                }
            }
        };
        sanitizeBody(body);
    }
    if (params) {
        for (const key in params) {
            if (typeof params[key] === "string") {
                params[key] = (0, sanitize_html_1.default)(params[key]);
            }
        }
    }
    if (query) {
        for (const key in query) {
            if (typeof query[key] === "string") {
                query[key] = (0, sanitize_html_1.default)(query[key]);
            }
        }
    }
    next();
};
exports.default = requestSanitizer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC1zYW5pdGl6ZXIubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9odG1sLXNhbml0aXplci5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQXlDO0FBRXpDLDRFQUFtRDtBQUVuRCxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEVBQUU7SUFDNUMsSUFBSTtRQUNGLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNsQyxNQUFNLElBQUksR0FBRyxNQUFNLHNCQUFXLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQztJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxLQUFLLENBQUM7S0FDZDtBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ2pGLE1BQU0sV0FBVyxHQUFHLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLElBQUksV0FBVztRQUFFLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFFL0IsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUNyQixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ3ZCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFFdEIsSUFBSSxJQUFJLEVBQUU7UUFDUiw4REFBOEQ7UUFDOUQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUNqQyxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDdEIsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFBLHVCQUFZLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBVyxDQUFDLENBQUM7aUJBQy9DO3FCQUFNLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO29CQUN4QyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3pCO2FBQ0Y7UUFDSCxDQUFDLENBQUM7UUFFRixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEI7SUFFRCxJQUFJLE1BQU0sRUFBRTtRQUNWLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO1lBQ3hCLElBQUksT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBQSx1QkFBWSxFQUFDLE1BQU0sQ0FBQyxHQUFHLENBQVcsQ0FBQyxDQUFDO2FBQ25EO1NBQ0Y7S0FDRjtJQUVELElBQUksS0FBSyxFQUFFO1FBQ1QsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDdkIsSUFBSSxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQ2xDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFBLHVCQUFZLEVBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBVyxDQUFDLENBQUM7YUFDakQ7U0FDRjtLQUNGO0lBRUQsSUFBSSxFQUFFLENBQUM7QUFDVCxDQUFDLENBQUM7QUFFRixrQkFBZSxnQkFBZ0IsQ0FBQyJ9