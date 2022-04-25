window.addEventListener('NEOLine.N3.EVENT.READY', () => {
    let neolineN3 = new NEOLineN3.Init();
    document.getElementById("exec").addEventListener("keyup", function (event) {
        if (event.code !== "Enter") return;
        const url = new URL(event.target.value);
        if (url.protocol !== "n3:") return;
        const repathname = new RegExp('^//(.*):(.*)@([a-zA-Z0-9]+)/([a-zA-Z0-9]+)$')
        const [_, sender, signer, scripthash, method] = url.pathname.match(repathname);
        const args = [...url.searchParams].map(([k, v]) => ({ type: k, value: v }))
        var invoke = {
            scriptHash: scripthash,
            operation: method,
            args: args,
            signers: [
                {
                    account: signer,
                    scopes: 1
                }
            ],
        }
        neolineN3.invokeRead(invoke).then(result => {
            console.log('Read invocation result: ' + JSON.stringify(result));
            window.alert(JSON.stringify(result));
        }).catch((error) => {
            const { type, description, data } = error;
            switch (type) {
                case 'NO_PROVIDER':
                    window.alert('No provider available.');
                    break;
                case 'CONNECTION_REFUSED':
                    window.alert('Connection dApp not connected. Please call the "connect" function.');
                    break;
                case 'RPC_ERROR':
                    window.alert('There was an error when broadcasting this transaction to the network.');
                    break;
                default:
                    // Not an expected error object.  Just write the error to the console.
                    window.alert(error);
                    break;
            }
        });
    });
});
