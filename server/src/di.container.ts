import { Container } from 'inversify'
import { MaintenanceRequestModule } from './repositories/maintenance-request/maintenance-request.module'

const container = new Container()
container.load(new MaintenanceRequestModule())

export { container }
