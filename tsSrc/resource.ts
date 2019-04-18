export let res = {
    HelloWorld_png : "res/HelloWorld.png",
};

export let g_resources : any[] = [];
for (let i in res) 
{
    g_resources.push((<any>res)[i]);
}
