import { ContainerModule, interfaces } from 'inversify'
import { MaintenanceRequestModel } from './maintenance-request.model'
import { MaintenanceRequestService } from './maintenance-request.service'
import { MaintenanceRequestResolver } from './maintenance-request.resolver'

export class MaintenanceRequestModule extends ContainerModule {
  constructor() {
    super((bind: interfaces.Bind) => {
      bind(MaintenanceRequestModel).toSelf()
      bind(MaintenanceRequestService).toSelf()
      bind(MaintenanceRequestResolver).toSelf()
    })
  }
}
