    //sessionStorage.setItem('apelido', <?php echo $_SESSION['apelido']?>);
    //sessionStorage.setItem('permissao', <?php echo $_SESSION['permissao']?>);

    //var apelido = usuario.value;
    //var permissao = permissao.value;
    //var apelido = sessionStorage.getItem('apelido');
    //var permissao = sessionStorage.getItem('permissao');
    //if (sessionStorage.getItem('apelido') == null) {
    //    apelido = sessionStorage.getItem('apelido');
    //    permissao = sessionStorage.getItem('permissao');
    //    //apelido = user.value;
    //} else {
    //    apelido = ' ';
    //    permissao = ' ';
    //}

    var apelido = '';
    var permissao = '';
    var aQT_Total = 0;
    var aVL_Total = 0;
    var aVenda = [];
    var aItens = [];

    if (user.innerHTML != null) {
        apelido = user.innerHTML;
        permissao = perm.innerHTML;
    }


    const URL_BASE = 'http://localhost/local/ws_p3/';
    const URL_BASE_PROD = 'http://localhost/local/ws_p3/produtos/';
    const URL_BASE_COME = 'http://localhost/local/ws_p3/comentarios/';
    const URL_BASE_USER = 'http://localhost/local/ws_p3/user/';

    //http://localhost/local/ws_p3/produtos

    const IniciaLoader = () => loader.innerHTML = "Aguarde, processando ... <i class='fas fa-sync fa-spin'></i>";

    const FinalizaLoader = () => loader.innerHTML = '';

    //insert into TabProduto (nom_produto, descricao, unidade, vl_custo, vl_venda, qt_minimo, qt_estoq, dt_registro) values ('teste1_prod','descricao teste1_produto','KG',9,12,2,8,'2020-12-02');

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#senha');

    togglePassword.addEventListener('click', function(e) {
        // toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        // toggle the eye slash icon
        this.classList.toggle('fa-eye-slash');
    });

    $('#IncluirComentarioModalLabel').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.data('whatever'); // Extract info from data-* attributes
        //var recipientcomentario = button.data('whatevercomentario')
        var modal = $(this);

        modal.find('.modal-title').text('ID ' + recipient);
        modal.find('#id').val(recipient);
        //modal.find('#comentario').val(recipientcomentario)
    });

    const CarregaDados = () => {

        //sessionStorage.setItem('apelido', "{<?php echo $_SESSION['apelido']?>}");
        //sessionStorage.setItem('permissao', "<?php echo $_SESSION['permissao']?>");

        let aItens1 = [];
        let xqtde = 0;
        let TemImagem = '';
        //aQT_Total = 0;
        //aVL_Total = 0;

        IniciaLoader();

        fetch(URL_BASE_PROD, { cache: 'no-store' })
            .then(response => response.json())
            .then(produtos => {
                var linha = '';
                produtos.data.forEach(produtos => {
                        if (produtos.imagem == 'N') {
                            TemImagem = 'N';
                        } else {
                            TemImagem = produtos.imagem;
                        }

                        linha += '<div id="prod' + produtos.controle + '" class="Card01">' +
                            '<p class="pCard01">' + produtos.nom_produto + ' - ' + produtos.unidade + '</p>' +
                            '<p class="pCard01">' + produtos.descricao + '</p>' +
                            '<p class="pCard01">' + produtos.vl_venda + '</p>';

                        if (TemImagem != 'N') {
                            linha += "<div class='lojaIMG'><img src='img/" + TemImagem + "' width='160' height='140'></div>";
                            //console.log(linha);
                        }

                        //linha += '<p class="pCard01">' + produtos.imagem + '</p>' +
                        //    '<p>' +
                        linha += '<p class="pCard01">' +
                            '<a href="javascript:void(0)" id="btn-comprar-' + produtos.controle + '" class="btn-primary">Comprar <i class="fa fa-edit"></i></a>' +
                            '<a href="javascript:void(0)" id="btn-comentarios-' + produtos.controle + '" class="btn-danger">Comentários <i class="fa fa-danger"></i></a>' +
                            '</p>' +
                            '</div>';

                        aItens1 = {
                            acodi: produtos.controle,
                            aprod: produtos.nom_produto,
                            aprun: produtos.vl_venda
                        };
                        aItens.push(aItens1);
                    })
                    //sessionStorage.setItem('apelido', "<?php echo $_SESSION['usuario']?>");
                    //sessionStorage.setItem('permissao', "<?php echo $_SESSION['permissao']?>");
                    //var apelido = sessionStorage.getItem('apelido');
                    //var permiss = sessionStorage.getItem('permissao');

                if (permissao == 'M') {
                    linha += '<button id="bGravar" type="submit" class="btn btn-primary"data-toggle="modal" data-target="#IncluiProdutoModalLabel">+</button>';
                }
                cardProd.innerHTML = linha;
                produtos.data.forEach(produtos => {
                    var bComprar = document.getElementById('btn-comprar-' + produtos.controle);
                    bComprar.addEventListener('click', () => {
                        Comprar(produtos.controle);
                    })
                    var bComentarios = document.getElementById('btn-comentarios-' + produtos.controle);
                    bComentarios.addEventListener('click', () => {
                        CarregaComentarios(produtos.controle);
                    })
                })
                FinalizaLoader();
            })
        CarregarCarrinho;
    }

    const CarregaComentarios = (idProduto) => {
        IniciaLoader();
        var linha = '';

        linha += "<button data-toggle='modal' data-target='#IncluirComentarioModalLabel' data-whatever='" + idProduto + "'>Deixe seu comentario</button>";
        linha += '<div id="prdCome">' +
            '<p>' + 'Produto: ' + idProduto + '</p>';
        fetch(URL_BASE_COME, { cache: 'no-store' })
            .then(response => response.json())
            .then(comentar => {
                //var linha = '';
                comentar.data.forEach(comentarios => {
                        if (comentarios['cod_produto'] == idProduto) {
                            linha += '<div id="come' + comentarios.controle + '" class="Card02">';
                            if ((comentarios.anonimo == 'N') && (comentarios.apelido != ' ' && comentarios.apelido != 'anonimo')) {
                                linha += '<span  style="color:red;">' + comentarios.apelido + ' </span>';
                            } else {
                                linha += '<span>' + `[anonimo]` + ' </span>';
                            }
                            linha += '<span><strong>' + comentarios.data + '-' + comentarios.hora + '</strong></span> - ' + comentarios.comentario
                                //'<a href="javascript:void(0)" id="btn-editar-' + produtos.controle + '" class="btn-primary">Comprar <i class="fa fa-edit"></i></a>' +
                            if (apelido == comentarios.apelido) {
                                linha += '<a href="javascript:void(0)" id="btn-apagacomentario-' + comentario.controle + '" class="btn-danger">Apagar <i class="fa fa-danger"></i></a>'
                            }
                            linha += '</div>';
                        }

                        //    
                        //echo "<div class='card01'>
                        //<span>{$userCom}   -  <strong>{$cliente->data}   -   {$cliente->hora}</strong></span>
                        //<button type='button' class='btn btn-xs btn-danger'  data-toggle='modal' 
                        //data-target='#ApagaModalLabel' 
                        //data-whatever='{$cliente->controle}' 
                        //data-whatevercomentario='{$cliente->comentario}'>Apagar</button>
                        //                       
                        //
                        //<p>
                        //{$cliente->comentario}</div>
                        //";
                        //

                    })
                    //cardCome.innerHTML = linha;
                    //            comentar.data.forEach(comentarios => {
                    //                var bEditar = document.getElementById('btn-editar-' + comentarios.controle);
                    //                bEditar.addEventListener('click', () => {
                    //                    CarregarRegistro(comentarios.controle);
                    //                })
                    //                var bComentarios = document.getElementById('btn-comentarios-' + comentarios.controle);
                    //                bExcluir.addEventListener('click', () => {
                    //                    Comentarios(comentarios.controle);
                    //                })
                    //})
                linha += '</div>';
                cardCome.innerHTML = linha;
                FinalizaLoader();
            })
    }

    const Excluir = (idProduto) => {
        if (window.confirm('Deseja excluir o Produto ' + idProduto + ' ?')) {
            IniciaLoader();
            fetch(URL_BASE_PROD + idProduto, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.status == 202) {
                        document.getElementById('linha' + idProduto).remove()
                    }
                    return response.json()
                })
                .then(json => {
                    //alert(json.mensagem)
                    FinalizaLoader()
                    CarregaDados()
                })
        }
    }


    const CarregarRegistro = (idProduto) => {
        IniciaLoader();
        fetch(URL_BASE_PROD + idProduto, { cache: 'no-store' })
            .then(response => response.json())
            .then(produto => {
                aid.value = produto.data[0].controle;
                aprodut.value = produto.data[0].nom_produto;
                adescri.value = produto.data[0].descricao;
                aunidad.value = produto.data[0].unidade;
                avlcust.value = produto.data[0].vl_custo;
                avlvend.value = produto.data[0].vl_venda;
                aqtmini.value = produto.data[0].qt_minimo;
                aqtesto.value = produto.data[0].qt_estoq;
                aimagem.value = produto.data[0].imagem;
                aacao.value = 'editar';
            })
        FinalizaLoader();
    }

    const IncluirDados = () => {

        //fetch('https://jsonplaceholder.typicode.com/posts', {
        //    method: "POST",
        //    body: JSON.stringify(_data),
        //    headers: {"Content-type": "application/json; charset=UTF-8"}

        //IniciaLoader();

        const url = 'process.php';
        const form = document.querySelector('form');
        const files = document.querySelector('[type=file]').files;
        const formData = new FormData();
        var TemImagem = 'N';

        if (aimagem.value == null || aimagem.value == '') {
            TemImagem = 'N';
        } else {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                formData.append('files[]', file);
            }
            TemImagem = files[0].name;
            //TemImagem = aimagem.value;
        }

        const envio_T = {
            nom_produto: aprodut.value,
            descricao: adescri.value,
            unidade: aunidad.value,
            vl_custo: avlcust.value,
            vl_venda: avlvend.value,
            qt_minimo: aqtmini.value,
            qt_estoq: aqtesto.value,
            imagem: TemImagem,
            //imagem: aimagem,
            dt_registro: '2020-12-07'
        };

        if (TemImagem != 'N') {
            fetch(url, {
                method: 'POST',
                body: formData
            }).then(response => {
                return response.text();
            }).then(data => {
                console.log(data);
            });
        }

        fetch(URL_BASE_PROD, {
                method: 'POST',
                body: JSON.stringify(envio_T),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                if (response.status == 200) {
                    CarregaDados()
                }
                return response.json()
            })
            .then(json => {
                //alert(json.message);
                FinalizaLoader();
            })
    }

    const EditarDados = () => {
        IniciaLoader();
        const envio_T = {
            controle: aid.value,
            nom_produto: aprodut.value,
            descricao: adescri.value,
            unidade: aunidad.value,
            vl_custo: avlcust.value,
            vl_venda: avlvend.value,
            qt_minimo: aqtmini.value,
            qt_estoq: aqtesto.value,
            imagem: imag.value,
            //imagem: aimagem
        };

        fetch(URL_BASE_PROD, {
                method: 'PUT',
                body: JSON.stringify(envio_T),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                if (response.status == 200) {
                    CarregaDados()
                }
                return response.json()
            })
            .then(json => {
                //alert(json.mensagem);
                FinalizaLoader();
            })
    }


    const INCComentario = () => {

        //const now = new Date;
        //const hora = now.getHours();
        var data = new Date();

        // Guarda cada pedaço em uma variável
        var dia = data.getDate(); // 1-31
        //var dia_sem = data.getDay();            // 0-6 (zero=domingo)
        var mes = data.getMonth(); // 0-11 (zero=janeiro)
        //var ano2    = data.getYear();           // 2 dígitos
        var ano4 = data.getFullYear(); // 4 dígitos
        var hora = data.getHours(); // 0-23
        var min = data.getMinutes(); // 0-59
        //var seg     = data.getSeconds();        // 0-59
        //var mseg    = data.getMilliseconds();   // 0-999
        //var tz      = data.getTimezoneOffset(); // em minutos

        // Formata a data e a hora (note o mês + 1)
        var str_data = dia + '/' + (mes + 1) + '/' + ano4;
        var str_hora = hora + ':' + min;
        var aaaanon = 'N';
        var aaaapel = 'erwin';


        //// || comentarios.apelido != 'anonimo' || comentarios.apelido != ' ') {
        //|| (apelido == '') || (apelido == ' ')) {
        if (apelido == null || (apelido == '') || (apelido == ' ')) {
            aaaanon = 'S';
            aaaapel = 'anonimo';
        } else {
            aaaanon = 'N';
            aaaapel = apelido;
        }

        //IniciaLoader();
        const envio_T = {
            anonimo: aaaanon,
            apelido: aaaapel,
            cod_produto: id.value,
            comentario: comentario.value,
            data: str_data,
            hora: str_hora
        };

        fetch(URL_BASE_COME, {
                method: 'POST',
                body: JSON.stringify(envio_T),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                if (response.status == 200) {
                    CarregaComentario(idProduto);
                }
                return response.json()
            })
            .then(json => {
                //alert(json.message);
                //FinalizaLoader();
                //CarregaComentario(idProduto)
            })
    }

    const LimparCampos = () => {
        aid.value = '';
        aprodut.value = '';
        adescri.value = '';
        aunidad.value = '';
        avlcust.value = '';
        avlvend.value = '';
        aqtmini.value = '';
        aqtesto.value = '';
        //aimagem.value = '';
        imag.value = '';
        aacao.value = 'incluir';
    }

    const GravarDados = () => {
        if (aacao.value == 'incluir') {
            IncluirDados();
        }
        if (aacao.value == 'editar') {
            EditarDados();
        }
        LimparCampos();
    }


    const Comprar = (idProduto) => {
        let aVenda1 = [];
        const result = aItens.find(itens => itens.acodi === idProduto);

        for (var i = 0; i < aItens.length; i++) {
            if (aItens[i].acodi == idProduto) {
                aVenda1 = {
                    acodi: aItens[i].acodi,
                    aprod: aItens[i].aprod,
                    aqtde: 1,
                    aprun: parseInt(aItens[i].aprun)
                };
                xtotal = aVenda1["aqtde"] * aVenda1["aprun"];
                aQT_Total += aVenda1["aqtde"];
                aVL_Total += xtotal;
            }
        }

        aVenda.push(aVenda1);
        localStorage.setItem('Produtos', JSON.stringify(aVenda));

        resultado.innerHTML = `Seu carrinho tem ${aQT_Total} itens - Valor R$ ${aVL_Total}`;
        conteudo.value += `Descricao: ${aVenda1["aprod"]} - QTDE: ${aVenda1["aqtde"]} - VALOR: ${xtotal} \n`;
    }

    const CarregarCarrinho = () => {
        //let avlTotal = 0;
        //let aqtItens = 0;
        let aVenda1 = [];
        let produtos = JSON.parse(localStorage.getItem('Produtos'));
        let xqtde = 0;
        //aQT_Total = 0;
        //aVL_Total = 0;
        conteudo.value = ''
        produtos.forEach(p => {
            aVenda1 = {
                acodi: p.acodi,
                aprod: p.aprod,
                aqtde: p.aqtde,
                aprun: p.aprun
            };
            xtotal = (p.aqtde * p.aprun);
            aQT_Total += p.aqtde;
            aVL_Total += xtotal;
            aVenda.push(aVenda1);
            conteudo.value += `Descricao: ${p.aprod} - QTDE: ${p.aqtde} - VALOR: ${xtotal} \n`;
        })
        resultado.innerHTML = `Seu carrinho tem ${aQT_Total} itens - Valor R$ ${aVL_Total}`;
    };

    ///////////////////////////////////////////////CadastrarUsuario
    const CadastrarUsuario = () => {

        //fetch('https://jsonplaceholder.typicode.com/posts', {
        //    method: "POST",
        //    body: JSON.stringify(_data),
        //    headers: {"Content-type": "application/json; charset=UTF-8"}

        //IniciaLoader();

        //xxx = eval("<?php password_hash( " + nsenha.value + ",PASSWORD_DEFAULT);");
        const envio_T = {
            apelido: napelido.value,
            usuario: nusuario.value,
            senha: nsenha.value,
            email: nemail.value,
            permissao: 'M',
            dt_registro: '2020-12-07'
        };

        fetch(URL_BASE_USER, {
                method: 'POST',
                body: JSON.stringify(envio_T),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                if (response.status == 200) {
                    //CarregaDados()
                }
                return response.json()
            })
            .then(json => {
                //alert(json.message);
                FinalizaLoader();
            })
    }


    const LimparCarrinho = () => {
        localStorage.removeItem('Produtos');
        conteudo.value = '';
        resultado.innerHTML = "Seu carrinho";
        aQT_Total = 0;
        aVL_Total = 0;
        aVenda = [];
        aVenda1 = [];

    }

    CarregaDados();
    CarregarCarrinho();
    //bCarregar.addEventListener('click', CarregaDados)
    //bLimpar.addEventListener('click', LimparCampos)
    //bGravar.addEventListener('click', GravarDados)
    //bIncProduto.addEventListener('click', IncluirDados)
    bIncComentario.addEventListener('click', INCComentario);
    //bComprar.addEventListener('click', Comprar)
    bLimparCarrinho.addEventListener('click', LimparCarrinho);

    //LimparCampos();