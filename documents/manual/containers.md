# Containers

Wick ModelContainers provide a way to store models. They provide methodes to sort models, pick specific models, and sort and filter models.

## Methods

## ```ModelContainer.get([item id a, item id b, ... item is n])```
## ```RangeModelContainer.get([range start a, range start b, ... item is n])```

Returns an ArrayModelContainer with the requested items. This is an active container that stays attached to original container, additions and removales from this container will affect the original container. Likewise, additions and removals from the original will be reflected in this container. Calling detach will remove this link. 

The returned model container is automatically culled unless the ModelContainer.pin() methode is called. It will remain active undefinitley, up until ModelContainer.unpin is called. 

remove

insert

get() : Returns WRAPPED plain array of Models
get(*term*) : Returns relevant (Matching the same type of Container that the original is) ModelContainer of Models
get([false,undefined,0], true) : Returns UNWRAPPED plain array of Models
