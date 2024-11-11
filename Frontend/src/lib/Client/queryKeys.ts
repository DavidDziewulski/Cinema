export const queryKeys = {
    getMovies: (title: string) => ['movies',title],
    getMovie: (id: string) => ['movie',id],
    // productionOrder: (productionOrderId: string) => [
    //     queryKeys.productionOrders(),
    //     productionOrderId,
    // ],
    // productionOrderEvents: (productionOrderId: string) => [
    //     queryKeys.productionOrder(productionOrderId),
    //     'events',
    // ],
    warehouseSectors: () => ['warehouseSectors'],
    transportOrders: () => ['transportOrders'],
    events: () => ['events'],
    event: (eventId: number) => [queryKeys.events(), eventId],
    eventComments: (eventId: number) => [queryKeys.event(eventId), 'comments'],
    eventSolution: (eventId: number) => [queryKeys.event(eventId), 'solution'],
} as const;
