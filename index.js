window.addEventListener('NEOLine.N3.EVENT.READY', () => {
    const neolineN3 = new NEOLineN3.Init();
    document.getElementById("exec").addEventListener("keyup", async function (event) {
        try {
            if (event.code !== "Enter") return;
            const url = new URL(event.target.value);
            if (url.protocol !== "n3:") throw 'protocol must be n3!';
            const [_0, _1, sender, _3, scopes, scripthash, method] = url.pathname.match(new RegExp('^//((.*)(:(.*))?@)?([a-zA-Z0-9]+)/([a-zA-Z0-9]+)$'));
            const ret = await neolineN3.invokeRead({
                scriptHash: scripthash,
                operation: method,
                args: [...url.searchParams].map(([k, v]) => ({ type: k, value: v })),
                signers: [{account: sender ?? await neolineN3.getAccount(), scopes: scopes?parseInt(scpoes):1}],
            });
            alert(JSON.stringify(ret));
        } catch (err) {
            alert(err);
        }
    });
});
