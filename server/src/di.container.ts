import { Container } from 'inversify'
import { MaintenanceRequestModule } from './modules/maintenance-request/maintenance-request.module'

const container = new Container()
container.load(new MaintenanceRequestModule())

export { container }
