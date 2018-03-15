function crearBackup() {
    var backup=[];
    var productos =[];
    var tiendas =[];
    var categorias =[];

    for(var i=0; i<instancia.productsDB.length;i++){
        productos.push(instancia.productsDB[i].getObject());
    }
    for(var i=0; i<instancia.categoriasDB.length;i++){
        categorias.push({product:instancia.categoriasDB[i].product,category: instancia.categoriasDB[i].category.getObject()});
    }
    for(var i=0; i<instancia.tiendasDB.length;i++){
        tiendas.push({product:instancia.tiendasDB[i].product,category: instancia.tiendasDB[i].shop.getObject()});
    }
    backup.push(categorias);
    backup.push(productos);
    backup.push(tiendas);
    var json = JSON.stringify(backup);

    $.post("backup.php",
        {
            cadena: json,
        });
}