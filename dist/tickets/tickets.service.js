"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const ticket_entity_1 = require("./entities/ticket.entity");
let TicketsService = class TicketsService {
    async create(createTicketDto) {
        return await ticket_entity_1.Ticket.create(Object.assign({}, createTicketDto)).save();
    }
    async findAll() {
        return await ticket_entity_1.Ticket.find();
    }
    async findOne(id) {
        return await ticket_entity_1.Ticket.findOneBy({ id });
    }
    async update(id, updateTicketDto) {
        const ticket = await this.findOne(id);
        ticket.message = updateTicketDto.message;
        return await ticket.save();
    }
    async remove(id) {
        const ticket = await this.findOne(id);
        if (ticket) {
            return await ticket.remove();
        }
        return undefined;
    }
};
TicketsService = __decorate([
    (0, common_1.Injectable)()
], TicketsService);
exports.TicketsService = TicketsService;
//# sourceMappingURL=tickets.service.js.map