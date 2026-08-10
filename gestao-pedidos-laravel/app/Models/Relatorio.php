<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Relatorio extends Model
{
    /** @use HasFactory<\Database\Factories\RelatorioFactory> */
    use HasFactory;

    public const STATUS_PENDENTE = 'pendente';

    public const STATUS_PROCESSANDO = 'processando';

    public const STATUS_CONCLUIDO = 'concluido';

    public const STATUS_FALHOU = 'falhou';

    protected $fillable = [
        'user_id',
        'tipo',
        'status',
        'arquivo_path',
        'erro',
        'concluido_em',
    ];

    protected function casts(): array
    {
        return [
            'concluido_em' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
