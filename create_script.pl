#!/usr/bin/env perl
use strict;
use warnings;

my ($start, $end);
my $indent = 0;
my $number = 0;
my $max_number = 0;

sub start {
    my ($code) = @_;
    $code =~ s/^(\s*)/'    ' x ($indent + length $1)/egm;
    $start .= $code;
}

sub end {
    my ($code) = @_;
    $code =~ s/^(\s*)/'    ' x ($indent + length $1)/egm;
    $end = $code . $end;
}

sub square {
    my ($n, $func) = @_;
    $start = '';
    $end = '';
    $indent = 0;
    $number = $n;
    $max_number = $n * ($n * $n + 1) / 2;

    start <<END;
 var used = 0;
END
    $func->();
    my $vars = join ',', map { map { "x$_" } ($_*10+1..$_*10+$n) } (1..$n);
    end <<END;
 show_ans([$vars]);
END
    return $start . $end;
}

sub search {
    my ($var, $cond, $start, $end) = @_;
    if($cond) {
        $cond = "!($cond) || ";
    } else {
        $cond = "";
    }
    start <<"END";
 for(var x$var = $start; x$var <= $end; x$var++) {
  if($cond(used & (1 << x$var))) continue;
  used |= (1 << x$var);
END
    end <<"END";
  used &= ~(1 << x$var);
 }
END
    $indent++;
}

sub second {
    my ($var, $cond, @rest) = @_;
    my @sum = map { join '+', map { "x$_" } @$_ } @rest;
    my $min_x = join ',', 1, map { "$max_number-($_)-$number*$number" } @sum;
    my $max_x = join ',',  $number*$number, map { "$max_number-($_)-1" } @sum;
    if($cond) {
        $cond = "!($cond) || ";
    } else {
        $cond = "";
    }
    start <<"END";
 var min_x$var = Math.max($min_x);
 var max_x$var = Math.min($max_x);
 for(var x$var = min_x$var; x$var <= max_x$var; x$var++) {
  if($cond(used & (1 << x$var))) continue;
  used |= (1 << x$var);
END
    end <<"END";
  used &= ~(1 << x$var);
 }
END
    $indent++;
}

sub decide {
    my ($var, $c, @rest) = @_;
    my @sum = map { join '+', map { "x$_" } @$_ } @rest;
    my $cond = join '', map {"x$var+$sum[$_] != $max_number || "} (1..@sum-1);
    $cond .= "$c ||" if $c;
    start <<"END";
 X$var: {
  var x$var = $max_number - ($sum[0]);
  if(${cond}x$var < 1 || (used & (1 << x$var))) break X$var;
  used |= (1 << x$var);
END
    end <<"END";
  used &= ~(1 << x$var);
 }
END
    $indent++;
}

my $count3 = square 3, sub {
    search 11, undef, 1, 9;
    second 22, undef, [11];
    decide 33, 'x11 < x33', [11, 22];
    second 13, 'x11 < x13', [11], [33];
    decide 31, 'x13 < x31', [13, 22];
    decide 12, undef, [11, 13];
    decide 23, undef, [13, 33];
    decide 21, undef, [22, 23], [11, 31];
    decide 32, undef, [12, 22], [31, 33];
};


open my $in, '<', 'count.tmpl.js' or die $!;
open my $out, '>', 'count.js' or die $!;
while(my $line = <$in>) {
    $line =~ s(^\s*/\**\s*<COUNT3>\s*\**/)($count3);
    print $out $line;
}
close $in;
close $out;
