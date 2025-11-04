"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTaskModule = void 0;
const common_1 = require("@nestjs/common");
const subtask_service_1 = require("./subtask.service");
const subtask_controller_1 = require("./subtask.controller");
let SubTaskModule = class SubTaskModule {
};
exports.SubTaskModule = SubTaskModule;
exports.SubTaskModule = SubTaskModule = __decorate([
    (0, common_1.Module)({
        controllers: [subtask_controller_1.SubTaskController],
        providers: [subtask_service_1.SubTaskService],
        exports: [subtask_service_1.SubTaskService],
    })
], SubTaskModule);
//# sourceMappingURL=subtask.module.js.map